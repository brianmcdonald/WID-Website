(function ($, Drupal, drupalSettings) {
  let base_url = drupalSettings.path.baseUrl;

  const countries = document.getElementById('countries');
  countries.addEventListener('click', function (e) {
    if (e.target && e.target.nodeName == 'LI') {
      const country_iso = e.target.getAttribute('value');

      for (let i = 0; i < this.childNodes.length; i++) {
        if (this.childNodes[i].className) {
          let current_class = country_iso.toString().toLowerCase();
          if (current_class == this.childNodes[i].className.trim()) {
            this.childNodes[i].className += ' active';
          } else {
            this.childNodes[i].classList.remove('active');
          }
        }
      }

      fetch(`${base_url}news/${country_iso}?_format=json`)
        .then(response => response.json())
        .then(results => {
          const cardsContainer = document.getElementById('news-cards');
          cardsContainer.innerHTML = '';

          for (let result of results) {
            const singleCard = document.createElement('div');
            singleCard.classList.add('single-card');
            cardsContainer.append(singleCard);

            const singleCardDiv = document.createElement('div');
            singleCard.append(singleCardDiv);

            if (result.field_featured_media && result.field_featured_media !== '') {
              const cardImage = document.createElement('img');
              cardImage.setAttribute('src', result.field_featured_media);
              singleCardDiv.append(cardImage);
            }

            const titleLink = document.createElement('a');
            titleLink.setAttribute('href', result.view_node);
            addElementToCard(titleLink, 'h2', result.title);
            singleCardDiv.append(titleLink);
            addElementToCard(singleCardDiv, 'p', result.body);
            addElementToCard(singleCardDiv, 'span', result.created);
          }
        });
    }
  });

  function addElementToCard(parent, tagName, textContent = null) {
    const newChild = document.createElement(tagName);
    if (textContent) {
      newChild.appendChild(document.createTextNode(textContent));
    }
    parent.append(newChild);
  };
})(jQuery, Drupal, drupalSettings);
