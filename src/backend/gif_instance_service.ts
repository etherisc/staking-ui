import { Signer } from "ethers";
import { formatBytes32String } from "ethers/lib/utils";
import { IInstanceService, IInstanceService__factory, IRegistry__factory } from "../contracts/gif-interface";
import { IBundle } from "../contracts/gif-interface/IInstanceService";

const GIF_INSTANCE_SERVICE_NAME = "InstanceService";

export class GifInstanceService {

    private signer: Signer;
    private registryToInstanceService: Map<string, IInstanceService> = new Map();

    constructor(signer: Signer) {
        this.signer = signer;
    }
    
    async getBundle(registry: string, bundleId: number): Promise<IBundle.BundleStructOutput> {
        const instanceService = await this.getInstanceService(registry);
        return await instanceService.getBundle(bundleId);
    }

    async getInstanceService(registryAddress: string): Promise<IInstanceService> {
        if (this.registryToInstanceService.has(registryAddress)) {
            return this.registryToInstanceService.get(registryAddress)!;
        }
        
        const registry = IRegistry__factory.connect(registryAddress, this.signer);
        const instanceServiceAddress = await registry.getContract(formatBytes32String(GIF_INSTANCE_SERVICE_NAME));
        // console.log("instanceServiceAddress", instanceServiceAddress);
        return IInstanceService__factory.connect(instanceServiceAddress, this.signer);
    }
        

}