<?php

/*
 * Add my new menu to the Admin Control Panel
 */
 
// Hook the 'admin_menu' action hook, run the function named 'ga_Add_My_Admin_Link()'
add_action( 'admin_menu', 'ga_Add_My_Admin_Link' );
$_nonce = '';

add_action('init', 'makeNonce');

function makeNonce(){
  global $_nonce;
  $_nonce = wp_create_nonce( 'wp_rest' );
}
 
// // Add a new top level menu link to the ACP
function ga_Add_My_Admin_Link()
{
      add_menu_page(
        'Gutenberg', // Title of the page
        'Gutenberg Angular', // Text to show on the menu link
        'manage_options', // Capability requirement to see the link
        'ga-admin', // The 'slug' - file to display when clicking the link,
        'showAdminPage'
    );
}

function showAdminPage(){
  global $_nonce;
  ob_get_clean();
  require plugin_dir_path(__FILE__) . 'ga-admin-page.php';
  ob_flush();
}

add_action( 'wp_enqueue_scripts', 'addLocalScript' );
add_action( 'admin_enqueue_scripts', 'addLocalScript' );
function addLocalScript(){
  global $_nonce;
  wp_register_script( 'local-var', plugin_dir_url(__FILE__) . 'local.js' );
  wp_enqueue_script( 'local-var' );
  wp_localize_script( 'local-var', 'wpApiSettings', array( 
    'root' => esc_url_raw( rest_url() ), 
    'nonce' => wp_create_nonce( 'wp_rest' )
  ) );
  
}

