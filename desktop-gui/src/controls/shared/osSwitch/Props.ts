export default interface Props {
    /**
     * All controls
     */
    component: {
        /**
         * Windows control
         */
        windows: React.ForwardRefExoticComponent<any>;

        /**
         * Mac control
         */
        mac: React.ForwardRefExoticComponent<any>;

        /**
         * Linux control
         */
        linux: React.ForwardRefExoticComponent<any>;
    }

    /**
     * Component props
     */
    props: any;

    /**
     * Component ref
     */
    refPassThrough: any;
}
