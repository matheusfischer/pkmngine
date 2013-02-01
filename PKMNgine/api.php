<?php
	
	/**
	 * PKMNgine API Processor
	 * 
	 * TODO: Everything.
	 * ----------------------------------------------------------
	 * A VERY basic testing enviorment has been setup, although
	 * this is nowhere near the final implementation.
	 */
	 
	// Let's set our mime-type.
	header('Content-Type: application/json');

	// What are we being asked for?
	$action					= strtolower(trim($_GET['op']));
	
	// What are we giving them back?
	$response				= array();
	
	switch($action)
	{
		case 'move'				:
			$response['request']		= true;
			break;
			
		case 'heartbeat'		:
			$response['request']		= true;
			break;
			
		default					:
			$response['request']		= false;
			$response['msg']			= 'Not valid request.';
			break;
	}
	
	echo json_encode( $response );
	
?>