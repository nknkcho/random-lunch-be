const statusCodes = {
  //요청 성공하고 반환해야 할 콘텐츠 있을 때
  OK: 200,
  //요청 성공하고 결과로 새로운 리소스가 생성되었을 때
  CREATED: 201,
  //요청 성공하였으나, 반환해야 할 콘텐츠가 없을 때
  NO_CONTENT: 204,
  //클라이언트에서 요청을 잘못된 형식으로 했을 때
  BAD_REQUEST: 400,
  //찾고자 하는 데이터가 db에 없을 때
  NOT_FOUND: 404,
  //이미 존재하는 데이터가 db에 있을 때(중복 정보 검사)
  CONFLICT: 409,
  INTERNAL_SERVER: 500,
};

export default statusCodes;
