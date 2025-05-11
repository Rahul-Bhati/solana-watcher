const fetchTokenPrice = async (mint: string) => {
    const res = await fetch(`https://public-api.birdeye.so/public/price?address=${mint}`, {
        headers: {
            "x-chain": "solana",
            "X-API-KEY": process.env.BIRDEYE_API_KEY,
        },
    });
    const json = await res.json();
    return json.data?.value || 0;
};

const transformTokens = async (rawTokens: any) => {
    const enriched = await Promise.all(
      rawTokens.map(async (t) => {
        const amount = t.token_info.balance / 10 ** t.token_info.decimals;
        const value = amount * price;

        return {
          name: t.content.metadata.name,
          symbol: t.content.metadata.symbol,
          icon: t.content.links.image,
          price,
          amount,
          value,
          change24h: 0, // optional: Birdeye also gives 24h change in `/token_data` endpoint
        };
      })
    );

    const filtered = enriched.filter((t) => t.value > 0);
    const sorted = filtered.sort((a, b) => b.value - a.value); // default sort by most value

    const totalValue = sorted.reduce((acc, t) => acc + t.value, 0);

    return { tokens: sorted, totalValue };
};

export default transformTokens;