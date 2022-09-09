import express from 'express';
import memberController from '../controllers/members';
const router = express.Router();

// 멤버 생성
router.post('/', memberController.createMember);
// 그룹 조회
router.get('/', memberController.getGroups);
// 멤버 삭제
router.delete('/:name', memberController.deleteMember);

export default router;
