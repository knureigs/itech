// прослушка cобытия копирования - как при Ctrl+C, так и при нажатии на кнопку или в контексном меню.
document.addEventListener('copy', function(e){
    // предотвратить стандартное копирование, иначе все просто скопируется как обычно.
	e.preventDefault();
    // выделенное в данный момент на странице - потом пойдет в буфер обмена.
	var selectionText = window.getSelection().toString();
    // коррекция того, что предполагается поместить в буфер обмена.
	var escaped = "Copy from: " + window.location + "\n" + selectionText;
	// вставляем измененный текст в буфер. 
    e.clipboardData.setData('text/plain', escaped);
  });