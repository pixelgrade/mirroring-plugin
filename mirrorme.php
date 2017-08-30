<?php
/*
Plugin Name: Mirroring
Plugin URI: http://wordpress.org/plugins/hello-dolly/
Description: This is it
Author: Pixelgrade
Version: 1.6.1
Author URI: http://pixelgrade.com/
*/

function mirrorme_add_scripts() {

//	UserOnline_Core::scripts();

//	wp_enqueue_style( 'mirrorme_style', plugin_dir_url( __FILE__ ) . 'css/gridable-style.css', array(), $this->version, 'all' );
	wp_enqueue_script( 'gyronorm', plugin_dir_url( __FILE__ ) . 'js/gyronorm.js', array(), '111', 'all' );
	wp_enqueue_script( 'mirrorme_script', plugin_dir_url( __FILE__ ) . 'js/mirroring.js', array(  ), '13', 'all' );

	$current_user = wp_get_current_user();

	$config = array();

	if ( is_user_logged_in() ) {
		$config['name'] = $current_user->display_name;
	}

	$provider = wc_social_login()->get_provider( 'facebook' );
	$return_url = home_url( add_query_arg( array() ) );

	$config['login_link'] = esc_url( wp_nonce_url( $provider->get_auth_url( $return_url, 'login' ), 'login' ) );

	wp_localize_script('mirrorme_script', 'mgame', $config );
}

add_action( 'wp_enqueue_scripts', 'mirrorme_add_scripts', 9 );

function mirrorme_add_shortcode( $atts, $content = "" ) {
	if ( is_user_logged_in() ) {
		return "<div id='mirroring'>a</div>";
	}

	return "<div id='notloggedin'></div>";
}
add_shortcode( 'mirroring', 'mirrorme_add_shortcode' );