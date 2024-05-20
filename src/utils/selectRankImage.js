const selectRankImage = (rank) => {
    const imagePathDict = {
        unranked: './rank-icons/unranked.png',
        iron: './rank-icons/iron.webp',
        bronze: './rank-icons/bronze.webp',
        silver: './rank-icons/silver.webp',
        gold: './rank-icons/gold.webp',
        platinum: './rank-icons/platinum.webp',
        emerald: './rank-icons/emerald.webp',
        diamond: './rank-icons/diamond.webp',
        master: './rank-icons/master.webp',
        grandmaster: './rank-icons/grandmaster.webp',
        challenger: './rank-icons/challenger.webp',
    };

    switch (true) {
        case rank?.toLowerCase().includes('unranked'):
            return imagePathDict.unranked;
        case rank?.toLowerCase().includes('iron'):
            return imagePathDict.iron;
        case rank?.toLowerCase().includes('bronze'):
            return imagePathDict.bronze;
        case rank?.toLowerCase().includes('silver'):
            return imagePathDict.silver;
        case rank?.toLowerCase().includes('gold'):
            return imagePathDict.gold;
        case rank?.toLowerCase().includes('platinum'):
            return imagePathDict.platinum;
        case rank?.toLowerCase().includes('emerald'):
            return imagePathDict.emerald;
        case rank?.toLowerCase().includes('diamond'):
            return imagePathDict.diamond;
        case rank?.toLowerCase().includes('grand'):
            return imagePathDict.grandmaster;
        case rank?.toLowerCase().includes('master'):
            return imagePathDict.master;
        case rank?.toLowerCase().includes('challenger'):
            return imagePathDict.challenger;
        default:
            // Handle cases where no match is found
            return undefined;
    }
};

export default selectRankImage;
