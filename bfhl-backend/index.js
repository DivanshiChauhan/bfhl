const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); 
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;
    
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: "Invalid input" });
    }

    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => isNaN(item));
    const highest_alphabet = alphabets.length > 0 ? [alphabets.sort().pop()] : [];

    const response = {
      is_success: true,
      user_id: "divanshi_15_12_03",
      email: "22bcs16156@cuchd.in",
      roll_number: "22BCS16156",
      numbers,
      alphabets,
      highest_alphabet,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ is_success: false, message: "Server error" });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
