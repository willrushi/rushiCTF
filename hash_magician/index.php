<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<link rel="stylesheet" href="style.css">
	<title>Document</title>
</head>
<body>
	<!-- Please don't dirb/bruteforce my server! -->
	<div class="content">
		<div class="row">
			<h1>✧・ﾟ:* Welcome to the lair of the Hash Magician! *:・ﾟ✧</h1>
		</div>
		<div class="row">
		<img src="magician2.png" width="400px"/>
			<p><i>
			A flag is what you hope to find,<br>
			Though first these words you must unwind.<br><br>

			Provide a key, then press submit<br>
			And you shall see if it will fit.<br><br>

			A hint to help you on your way;<br>
			The hashing type is quite cliché.<br><br>

			As for the language, tis tried and true,<br>
			Though insecure through many's view.<br><br>

			Juggling of types, this script promotes<br>
			But can you find a hash that floats?<br><br>
			</i></p>
		</div>
		<div class="row">
			<form action="index.php" method="GET">
				<input type="text" name="value"><br><br>
				<input type="submit">
			</form>
		</div>
		<div>
			<?php
				$val = htmlspecialchars($_GET["value"]);
				if($val){
					$md5 = md5($val);
					echo "<p>Your input: ".$val."</p>";
					echo "<p>Result: ".$md5."</p>";
					if($md5 == "0"){
						echo "Congratulations, you are worthy! FLAG{4lw4ys_us3_tr1pl3_equ4l5}";
					}else{
						echo "Your input was not worthy of the flag.";
					}
				}
			?>
		</div>
	</div>
</body>
</html>