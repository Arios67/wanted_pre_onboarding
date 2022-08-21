import { Recruit } from "../entities/recruit.entity";
import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Company } from "../entities/company.entity";

export class RecruitService {
  constructor() {}
  static create = async (req: Request, res: Response) => {
    const recruitRepository = getRepository(Recruit);
    const companyRepository = getRepository(Company);
    const { companyName, ...rest } = req.body;
    const company = await companyRepository.findOne({ name: companyName });
    await recruitRepository.save({
      ...rest,
      company: company.id,
    });
    res.send("채용공고 등록");
  };

  static update = async (req: Request, res: Response) => {
    const recruitRepository = getRepository(Recruit);
    const { recruitId, ...rest } = req.body;
    const recruit = await recruitRepository.findOne({ id: recruitId });
    await recruitRepository.save({
      ...recruit,
      ...rest,
    });
    res.send("채용공고 수정");
  };

  static delete = async (req: Request, res: Response) => {
    const recruitRepository = getRepository(Recruit);
    const { recruitId } = req.body;
    await recruitRepository.delete({ id: recruitId });
    res.send("채용공고 삭제");
  };

  static findAll = async (req: Request, res: Response) => {
    const recruitRepository = getRepository(Recruit);
    const result = await recruitRepository.find();
    res.send(
      result.map((e) => {
        return {
          회사명: e.company.name,
          지역: e.company.region,
          채용포지션: e.position,
          사용기술: e.stack,
        };
      })
    );
  };

  static find = async (req: Request, res: Response) => {
    const recruitRepository = getRepository(Recruit);
    const { recruitId } = req.params;
    const result = await recruitRepository.findOne({ id: recruitId });
    const tmp = await recruitRepository.find({ company: result.company });
    const other = tmp.filter((e) => e.id !== result.id).map((e) => e.id);
    res.send({
      회사명: result.company.name,
      지역: result.company.region,
      채용포지션: result.position,
      사용기술: result.position,
      채용상세: result.description,
      회사가올린다른채용공고: other,
    });
  };

  static search = async (req: Request, res: Response) => {
    const { keyword } = req.params;
    const result = await getRepository(Recruit)
      .createQueryBuilder("recruit")
      .leftJoinAndSelect("recruit.company", "company")
      .where("company.name like :input", { input: `%${keyword}%` })
      .orWhere("company.region like :input", { input: `%${keyword}%` })
      .orWhere("recruit.position like :input", { input: `%${keyword}%` })
      .orWhere("recruit.description like :input", { input: `%${keyword}%` })
      .orWhere("recruit.stack like :input", { input: `%${keyword}%` })
      .getMany();

    res.send(
      result.map((e) => {
        return {
          회사명: e.company.name,
          지역: e.company.region,
          채용포지션: e.position,
          사용기술: e.stack,
        };
      })
    );
  };
}
