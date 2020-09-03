<?php

namespace Drupal\wid_custom_twig;

use Twig_SimpleFunction;
use Twig_ExtensionInterface;
use Drupal;
use Twig_Extension;
use Drupal\node\Entity\Node;
use Drupal\media\Entity\Media;
use Drupal\file\Entity\File;

/**
 * Extend Drupal's Twig_Extension class.
 */
class CustomTwigExtension extends Twig_Extension {
  /**
   * Name of twig.
   */
  public function getName() {
    return 'wid_custom_twig.CustomTwigExtension';
  }

  /**
   * Return your custom twig function to Drupal.
   */
  public function getFunctions() {
    $functions = [
      new Twig_SimpleFunction('media_file_url', [$this, 'mediaFileUrl']),
    ];
    return $functions;
  }

  /**
   * Returns the file URL from a media entity.
   *
   * @param string $mid
   *   The media entity target id.
   * @param string $field
   *   The media field.
   *
   * @return string
   *   The file url.
   */
  public function mediaFileUrl($mid, $field = 'field_media_image') {
    if (!$mid) {
      return NULL;
    }
    $media = Media::load($mid);
    $fid = $media->$field->target_id;
    $file = File::load($fid);
    if ($file) {
      $url = $file->createFileUrl();
      return $url;
    }
    return NULL;
  }
}
