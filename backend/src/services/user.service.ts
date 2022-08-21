import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Apply } from "../entities/apply.entity";
import { Recruit } from "../entities/recruit.entity";

export class UserService {
  constructor() {}
  static apply = async (req: Request, res: Response) => {
    const recruitRepository = getRepository(Recruit);
    const applyRepository = getRepository(Apply);
    const { recruitId, userId } = req.body;
    const recruit = await recruitRepository.findOne({ id: recruitId });
    if (!recruit) {
      res.send("존재하지 않는 공고입니다.");
      return;
    }
    const prev = await applyRepository.findOne({
      where: {
        userId: userId,
        recruit: recruit,
      },
      relations: ["recruit"],
    });
    if (prev) {
      res.send("이미 지원한 공고입니다.");
      return;
    } else {
      applyRepository.save({
        userId,
        recruit,
      });
      res.send("입사 지원");
      return;
    }
  };
}
