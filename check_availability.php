<?php 
require_once("admin/include/config.php");
if(!empty($_POST["r_trn_id"])) {
	$rid= $_POST["r_trn_id"];
	
		$result =mysqli_query($con,"SELECT r_trn_id FROM eve_reg WHERE r_trn_id='$rid'");
		$count=mysqli_num_rows($result);
if($count>0)
{
	echo "<span style='color:red'> Invalid Transaction ID .</span>";
 	echo "<script>$('#submit').prop('disabled',true);</script>";
} else{
 	echo "<script>$('#submit').prop('disabled',false);</script>";
} 
}


?>
