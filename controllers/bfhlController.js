const getBfhl = (req, res) => {
    try {
        res.status(200).json({ operation_code: 1 });
    } catch (error) {
        res.status(500).json({ 
            is_success: false,
            error: error.message 
        });
    }
};

const postBfhl = (req, res) => {
    try {
        const { data } = req.body;
        
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                error: "Invalid input data"
            });
        }

        // Filter numbers and alphabets
        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => isNaN(item) && item.length === 1);
        
        // Find highest alphabet
        const highest_alphabet = alphabets.length > 0 ? 
            [alphabets.reduce((a, b) => a.toLowerCase() > b.toLowerCase() ? a : b)] : 
            [];

        res.status(200).json({
            is_success: true,
            user_id: process.env.USER_ID,
            email: process.env.EMAIL,
            roll_number: process.env.ROLL_NUMBER,
            numbers: numbers,
            alphabets: alphabets,
            highest_alphabet: highest_alphabet
        });
    } catch (error) {
        res.status(500).json({
            is_success: false,
            error: error.message
        });
    }
};

module.exports = {
    getBfhl,
    postBfhl
}; 