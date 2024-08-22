class DataController {
    constructor(db) {
        this.db = db;
    }

    async addData(req, res) {
        try {
            const collection = this.db.collection("quiz");
            const result = await collection.insertOne(req.body);
            res.status(201).json({
                message: "Data added successfully",
                id: result.insertedId,
            });
        } catch (error) {
            console.error("Error adding data:", error);
            res.status(500).json({ message: "Failed to add data" });
        }
    }
}

module.exports = DataController;
