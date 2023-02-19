<?
// Автор скрипта Аминев Марат
// Понравился скрипт?
//  Скажи спасибо :   https://dwweb.ru/help_to_dwweb.ru.html -->
/**
 * @license   licensed under the MIT.
 * @Copyright © 2015 Aminev Marat R. , https://dwweb.ru/
 * @Copyright © 2015 Аминев Марат Р. , https://dwweb.ru/
*/
  header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
  header("Last-Modified: " . gmdate("D, d M Y H:i:s")." GMT");
  header("Cache-Control: no-cache, must-revalidate");
  header("Cache-Control: post-check=0,pre-check=0", false);
  header("Cache-Control: max-age=0", false);
  header("Pragma: no-cache");
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Chat_2(jquery)</title>
<link rel="stylesheet" href="css.css">
<script src="jquery-3.3.1.min.js"></script>
</head>
<body>
	 

	<h2 title="Это пример простого чата:"> Это пример простого чата №2:</h2>
	<div id="content"></div>

		<script>
			function show() {
			    // выводим сообщения в блок #messages
			    $.ajax({
			        url: 'content.dat',
			        timeout: 10000, // время ожидания загрузки сообщений 10 секунд (или 10000 миллисекунд)
			        success: function(data) {
			            $('#content').html(data);
			        },
			        error: function() {
			            $('#content').html("Не удалось загрузить сообщения");
			        }
			    });
			}
			var interval = 1000; // количество миллисекунд для авто-обновления сообщений (1 секунда = 1000 миллисекунд)

			show();

			setInterval('show()', interval);
		</script>

	<div id="show_rezult">&nbsp;</div>
  <div class="example">
    <input type="text" size="30"    id="send_name" placeholder="Имя - 20 знаков">
    <textarea type="text" size="30" id="send_mess" placeholder="Сообщение  - 200 знаков"></textarea>
      <button onclick="send()">Отправить</button>
  </div>
</div>

<script src="send.js"></script>
</body>
</html>
