import Member from '../models/members';
import statusCodes from '../config/statusCodes';

const createMember = async (req, res) => {
  try {
    const { name } = req.body;
    if (name.length === 0) {
      return await Promise.reject({
        message: 'BAD_REQUEST',
        status: statusCodes.BAD_REQUEST,
      });
    }
    const searchName = await Member.searchName(name);
    if (searchName.length > 0) {
      return await Promise.reject({
        message: 'CONFLICT',
        status: statusCodes.CONFLICT,
      });
    }
    const data = await Member.create(name);
    return res.status(statusCodes.CREATED).send({
      data,
    });
  } catch (error) {
    res.status(error.status || statusCodes.INTERNAL_SERVER).send({
      message: error.message || 'UNKNOWN_ERROR',
    });
  }
};

const getMembers = (req, res) => {
  try {
    return res.send('hi members');
  } catch (error) {
    console.log(error);
  }
};

const deleteMember = async (req, res) => {
  try {
    const { name } = req.params;
    const searchName = await Member.searchName(name);
    if (searchName.length === 0) {
      return await Promise.reject({
        message: 'NOT_FOUND',
        status: statusCodes.NOT_FOUND,
      });
    }
    await Member.delete(name);
    return res.status(statusCodes.NO_CONTENT);
  } catch (error) {
    res.status(error.status || statusCodes.INTERNAL_SERVER).send({
      message: error.message || 'UNKNOWN_ERROR',
    });
  }
};

export default { createMember, getMembers, deleteMember };
