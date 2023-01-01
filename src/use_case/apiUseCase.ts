import { Config } from '../main';
import { methodRepository } from "../repositories/method"

export class apiUseCase {
    private methodRepository: methodRepository;
    private cfg: Config;
    constructor(methodRepo: methodRepository, cfg: Config) {
        this.methodRepository = methodRepo;
        this.cfg = cfg;
    }

    public listAllMethod = async () => {
        return this.methodRepository.listAllMethod();
    }

    public updateMethodById = async (body: { methodId: string, available: boolean }) => {
        return this.methodRepository.updateMethodById(body);
    }
}