<?php

/*
 * Add my new menu to the Admin Control Panel
 */
 
// Hook the 'admin_menu' action hook, run the function named 'ga_Add_My_Admin_Link()'
add_action( 'admin_menu', 'ga_Add_My_Admin_Link' );
 
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
 
  require plugin_dir_path(__FILE__) . 'ga-admin-page.php';
}
