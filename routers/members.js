import express from 'express';
import memberController from '../controllers/members';
const router = express.Router();

// 멤버 생성
router.post('/', memberController.createMember);
// 멤버 조회
router.get('/', memberController.getMembers);
// 멤버 삭제
router.delete('/', memberController.deleteMember);

export default router;
