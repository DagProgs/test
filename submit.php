<?
// Автор скрипта Аминев Марат
// Понравился скрипт?
//  Скажи спасибо :   https://dwweb.ru/help_to_dwweb.ru.html -->
/**
 * @license   licensed under the MIT.
 * @Copyright © 2015 Aminev Marat R. , https://dwweb.ru/
 * @Copyright © 2015 Аминев Марат Р. , https://dwweb.ru/
*/

$name       = htmlspecialchars($_POST['name']);
$mess       = htmlspecialchars($_POST['mess']);
$time       = date('Y/m/d - h-i');
$data       = '<div class=main><div class=name>'.$name.'   <div class=time>'.$time.'</div></div><div class=mess>'.$mess."</div></div>\n";
$delit      = explode(' ', $name);
$file_write = __DIR__.'/content.dat';

if ($delit[2])
{
	echo '<red>Имя  не больше 2 слов!</red>';
}
else
{
	if ($name[40])
	{
		echo '<red>Имя не больше 20 знаков!</red>';
	}
	else
	{
		if ($mess[300])
		{
			echo '<red>Нельзя больше 200 знаков за раз!</red>';
		}
		else
		{
			if ($name and $mess)
			{
					$data = $data.(@file_get_contents($file_write));
					$write = @file_put_contents($file_write, $data ,  LOCK_EX);
					if($write){ echo '<b class=time>Записано'; } else{ echo '<red>Данные не записаны</red>'; }
			}
			else
			{
				 echo '<red>Какое-то из полей пустое!</red>';
			}
		}
	}
}
