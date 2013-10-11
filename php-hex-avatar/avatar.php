<?php
 
// Init
header("Content-type: image/png");
$im     = imagecreatefrompng("images/avatar.png");
$green  = imagecolorallocate($im, 0, 255, 0);
$red  = imagecolorallocate($im, 255, 0, 0);
$font = 'VeraMoBd.ttf';
$fontSize = '11';
$fontRotation = '0';

// h4x0r
$ip = explode('.', $_SERVER['REMOTE_ADDR']);

// Dimensions
$initialX = '12';
$initialY = '20';
$increaseY = '23';
 
// Lines
// 1 
$l11 = sprintf("%02x", rand(1, 255)) . ' ' . sprintf("%02x", rand(1, 255)) . ' ' . sprintf("%02x", rand (1, 255));
$l12 = sprintf("%02x", $ip[0]);
$l13 = sprintf("%02x", rand(1, 255));
// 2 
$l2 = sprintf("%02x", rand(1, 255)) . ' ' . sprintf("%02x", rand(1, 255)) . ' ' . sprintf("%02x", rand (1, 255)) . ' ' . sprintf("%02x", rand(1, 255)) . ' ' . sprintf("%02x", rand (1, 255));
// 3 
$l31 = sprintf("%02x", $ip[1]);
$l32 = sprintf("%02x", rand(1, 255)) . ' ' . sprintf("%02x", rand(1, 255)) . ' ' . sprintf("%02x", rand (1, 255)) . ' ' . sprintf("%02x", rand(1, 255));
// 4
$l4 = sprintf("%02x", rand(1, 255)) . ' ' . sprintf("%02x", rand(1, 255)) . ' ' . sprintf("%02x", rand (1, 255)) . ' ' . sprintf("%02x", rand(1, 255)) . ' ' . sprintf("%02x", rand (1, 255));
// 5
$l51 = sprintf("%02x", rand(1, 255)) . ' ' . sprintf("%02x", rand(1, 255));
$l52 = sprintf("%02x", $ip[2]); 
$l53 = sprintf("%02x", rand(1, 255)) . ' ' . sprintf("%02x", rand(1, 255));
// 6
$l6 = sprintf("%02x", rand(1, 255)) . ' ' . sprintf("%02x", rand(1, 255)) . ' ' . sprintf("%02x", rand (1, 255)) . ' ' . sprintf("%02x", rand(1, 255)) . ' ' . sprintf("%02x", rand (1, 255));
// 7
$l71 = sprintf("%02x", rand(1, 255));
$l72 = sprintf("%02x", $ip[3]);
$l73 = sprintf("%02x", rand(1, 255)) . ' ' . sprintf("%02x", rand(1, 255)) . ' ' . sprintf("%02x", rand(1, 255));

// L1
imagettftext($im, $fontSize, $fontRotation, $initialX, $initialY, $green, $font, $l11);
imagettftext($im, $fontSize, $fontRotation, 93, $initialY, $red, $font, $l12);
imagettftext($im, $fontSize, $fontRotation, 120, $initialY, $green, $font, $l13);
// L2
imagettftext($im, $fontSize, $fontRotation, $initialX, $initialY*2, $green, $font, $l2);
// L3
imagettftext($im, $fontSize, $fontRotation, $initialX, $initialY*3, $red, $font, $l31);
imagettftext($im, $fontSize, $fontRotation, 39, $initialY*3, $green, $font, $l32);
// L4
imagettftext($im, $fontSize, $fontRotation, $initialX, $initialY*4, $green, $font, $l4);
// L5
imagettftext($im, $fontSize, $fontRotation, $initialX, $initialY*5, $green, $font, $l51);
imagettftext($im, $fontSize, $fontRotation, 66, $initialY*5, $red, $font, $l52);
imagettftext($im, $fontSize, $fontRotation, 93, $initialY*5, $green, $font, $l53);
// L6
imagettftext($im, $fontSize, $fontRotation, $initialX, $initialY*6, $green, $font, $l6);
// L7
imagettftext($im, $fontSize, $fontRotation, $initialX, $initialY*7, $green, $font, $l71);
imagettftext($im, $fontSize, $fontRotation, 39, $initialY*7, $red, $font, $l72);
imagettftext($im, $fontSize, $fontRotation, 66, $initialY*7, $green, $font, $l73);

// Gen image
imagepng($im);
imagedestroy($im);
 
?>

