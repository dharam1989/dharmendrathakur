<?php

	class x
	{
		var $check;

		function __construct()
		{
			$this->check = "classy";
		}

		function get($value = false)
		{
			$bt = debug_backtrace(); 
			if(!$value && $bt[0]['type'] =='::')
			{
				throw new Exception(__METHOD__." must have \$value set if called as static method");
			}

			return ($value ? $value : $this->check);
		}
	}

	echo "\n1: " . x::get("static") . "\n";

	$y = new x();

	echo "2: " . $y->get() . "\n";

	echo "3: " . $y->get("snazzy") . "\n";

	echo "4: " . $y::get("breezy") . "\n";

	try
	{
		echo "5: " . $y::get() . "\n";
	}
	catch(Exception $e)
	{
		echo "\nError: " . $e->getMessage() . "\n";
	}

	echo "\nAll Done\n";
	
	
	
	
?>
