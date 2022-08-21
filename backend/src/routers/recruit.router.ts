import express from "express";
import { RecruitService } from "../services/recruit.service";

const recruitRouter = express.Router();

// 채용 공고 생성
recruitRouter.post("/create", RecruitService.create);

// 채용 공고 수정
recruitRouter.put("/update", RecruitService.update);

// 채용 공고 삭제
recruitRouter.delete("/delete", RecruitService.delete);

// 채용 공고 전체 조회
recruitRouter.get("/findAll", RecruitService.findAll);

// 채용 상세 페이지 조회
recruitRouter.get("/find/:recruitId", RecruitService.find);

// 채용 공고 검색
recruitRouter.get("/search/:keyword", RecruitService.search);

export default recruitRouter;
