export default async function handler(req, res) {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: 'query required' });

    try {
        const response = await fetch(
            `https://openapi.naver.com/v1/search/news.json?query=${encodeURIComponent(query)}&display=3&sort=date`,
            {
                headers: {
                    'X-Naver-Client-Id': '4QXSi5IQW7_swkzryOYx',
                    'X-Naver-Client-Secret': 'HCV9s5fvzG'
                }
            }
        );
        const data = await response.json();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}
