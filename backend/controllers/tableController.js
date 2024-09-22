const Table = require('../models/Table');

exports.getTableData = async (req, res) => {
  try {
    const tableData = await Table.find();
    res.json(tableData);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createOrUpdateTable = async (req, res) => {
  const { name, date, rules } = req.body;

  try {
    let row = await Table.findOne({ name, date });
    if (row) {
      row.rules = rules;
      await row.save();
    } else {
      const newRow = new Table({ name, date, rules });
      await newRow.save();
    }
    res.json({ message: 'Table updated/created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update table' });
  }
};

exports.checkRules = async (req, res) => {
  const { id } = req.params;
  const { rules } = req.body;

  try {
    const row = await Table.findById(id);
    if (!row) return res.status(404).json({ error: 'Row not found' });

    row.rules = rules;
    await row.save();

    if (rules.startOfDay && rules.endOfDay) {
      // Send notification to admin (pseudo-code)
      // notifyAdmin();
    }

    res.json({ message: 'Rules updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update rules' });
  }
};
