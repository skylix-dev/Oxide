export default interface RendererSettings {
    /**
     * What port should the server use, when not used, any port available is used if 3000 is used
     */
    forcedPort?: number;

    /**
     * Root directory of the project were the package file is located
     */
    projectRoot: string;
}
