import db from '../config/db.js';

const Member = {
  create: async name => {
    try {
      await db.execute('INSERT INTO members (name) VALUES (?)', [name]);
      const [row] = await db.query('SELECT id, name FROM members WHERE name = ?', [name]);
      return row;
    } catch (error) {
      console.log(error);
    }
  },

  searchName: async name => {
    try {
      const [row] = await db.query('SELECT id FROM members WHERE name = ?', [name]);
      return row;
    } catch (error) {
      console.log(error);
    }
  },

  getList: async () => {
    try {
      const [row] = await db.query('SELECT * FROM members');
      return row;
    } catch (error) {
      console.log(error);
    }
  },

  delete: async name => {
    try {
      await db.execute('DELETE FROM members WHERE name = ?', [name]);
    } catch (error) {
      console.log(error);
    }
  },
};

export default Member;
