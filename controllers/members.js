import Member from '../models/members';
import statusCodes from '../config/statusCodes';

const createMember = async (req, res) => {
  try {
    const { name } = req.body;
    const searchName = await Member.searchName(name);
    console.log(searchName);
    if (searchName.length > 0) {
      return res.status(statusCodes.CONFLICT).send({
        message: 'CONFLICT',
      });
    }
    const data = await Member.create(name);
    return res.status(statusCodes.CREATED).send({
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

const getMembers = (req, res) => {
  try {
    return res.send('hi members');
  } catch (error) {
    console.log(error);
  }
};

const deleteMember = (req, res) => {
  try {
    return res.send('hi members');
  } catch (error) {
    console.log(error);
  }
};

export default { createMember, getMembers, deleteMember };
