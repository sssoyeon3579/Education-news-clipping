import https from 'https';

export default async function handler(req, res) {
    const { query, display = '5' } = req.query;
    if (!query) return res.status(400).json({ error: 'query required' });

    try {
        const data = await new Promise((resolve, reject) => {
            const path = `/v1/search/news.json?query=${encodeURIComponent(query)}&display=${display}&sort=date`;
            const options = {
                hostname: 'openapi.naver.com',
                path,
                method: 'GET',
                headers: {
                    'X-Naver-Client-Id': '4QXSi5IQW7_swkzryOYx',
                    'X-Naver-Client-Secret': 'HCV9s5fvzG'
                }
            };
            https.get(options, (r) => {
                let body = '';
                r.on('data', chunk => body += chunk);
                r.on('end', () => {
                    try { resolve(JSON.parse(body)); }
                    catch(e) { reject(e); }
                });
            }).on('error', reject);
        });

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}
