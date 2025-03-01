async function loadFiles() {
    const contentDiv = document.getElementById("content");

    // `text_date` フォルダにあるファイルのリストを取得
    const response = await fetch('https://api.github.com/repos/kymst2357/pjx_data_839/contents/extracted_files/pixiv/text_date');
    const files = await response.json();

    for (const file of files) {
        if (file.name.endsWith('.txt')) { // テキストファイルのみ対象
            const textResponse = await fetch(`extracted_files/pixiv/text_date/${file.name}`);
            const textContent = await textResponse.text();

            // 作品のタイトルを強調表示
            const fileDiv = document.createElement("div");
            fileDiv.innerHTML = `<h2>${file.name}</h2><pre>${textContent}</pre>`;
            contentDiv.appendChild(fileDiv);
        }
    }
}

// ページ読み込み時に実行
window.onload = loadFiles;
