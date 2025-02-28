async function search() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const response = await fetch('extracted_files/pixiv/meta_date/all_data.json');
    const data = await response.json();
    
    // 検索条件に一致する作品をフィルタリング
    const results = data.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.tags.some(tag => tag.toLowerCase().includes(query))
    );

    displayResults(results);
}

function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    
    if (results.length === 0) {
        resultsDiv.innerHTML = '<p>該当する作品が見つかりませんでした。</p>';
        return;
    }

    results.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `
            <h2>${item.title}</h2>
            <p>作者: ${item.author}</p>
            <p>タグ: ${item.tags.join(', ')}</p>
            <a href="extracted_files/pixiv/text_date/${item.id.toString().padStart(5, '0')}.txt" target="_blank">本文を読む</a>
        `;
        resultsDiv.appendChild(div);
    });
}
