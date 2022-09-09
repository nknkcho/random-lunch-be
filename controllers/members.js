import Member from '../models/members';
import statusCodes from '../constants/statusCodes';

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
    const createdMemberData = await Member.create(name);
    return res.status(statusCodes.CREATED).send(createdMemberData);
  } catch (error) {
    res.status(error.status || statusCodes.INTERNAL_SERVER).send({
      message: error.message || 'UNKNOWN_ERROR',
    });
  }
};

const getGroups = async (req, res) => {
  try {
    const { groups, groupSize } = req.query;
    const memberList = await Member.getList();
    if (groups == 0 && groupSize == 0) {
      return res.status(statusCodes.OK).send(memberList);
    }

    let memberNumber = memberList.length;
    const numberOfMembersInOneGroup = parseInt(memberNumber / groups);
    let memberListResult = [];
    const shuffle = memberList => {
      for (let i = 0; i < memberList.length; i++) {
        const j = Math.floor(Math.random() * (i + 1));
        [memberList[i], memberList[j]] = [memberList[j], memberList[i]];
      }
      return memberList;
    };
    let shuffledMemberList = await shuffle(memberList);

    if (memberNumber === 0) {
      return res.status(statusCodes.OK).send({
        message: 'NO_DATA',
      });
    }

    if (groups * groupSize > memberNumber || groups == 0 || groupSize == 0) {
      return await Promise.reject({
        message: 'BAD_REQUEST',
        status: statusCodes.BAD_REQUEST,
      });
    }

    for (let i = 0; i < groups; i++) {
      memberListResult[i] = [];
      for (let j = 0; j < numberOfMembersInOneGroup; j++) {
        memberListResult[i].push(shuffledMemberList[0]);
        shuffledMemberList.shift();
      }
    }
    shuffledMemberList.forEach((item, index) => {
      memberListResult[index].push(item);
    });

    return res.status(statusCodes.OK).send(memberListResult);
  } catch (error) {
    res.status(error.status || statusCodes.INTERNAL_SERVER).send({
      message: error.message || 'UNKNOWN_ERROR',
    });
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

export default { createMember, getGroups, deleteMember };
