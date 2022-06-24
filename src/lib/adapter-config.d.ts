// This file extends the AdapterConfig type from "@types/iobroker"

interface WindowContactConfig {
    id: string;
    valueOpen: number | boolean;
}

interface ShutterConfig {
    id: string; //ioBroker Object id
    direction: number; //direction the shutter faces
    height: number | undefined; //the height level, if below, shutter won't close.
    windowContact: undefined | WindowContactConfig;
    valueClosed: number | boolean;
}


// Augment the globally declared type ioBroker.AdapterConfig
declare global {
    namespace ioBroker {
        interface AdapterConfig {
            shutters: Array<ShutterConfig>;
        }
    }
}

// this is required so the above AdapterConfig is found by TypeScript / type checking
export {};