export default interface Props {
    /**
     * Body content
     */
    children: JSX.Element | JSX.Element[];

    /**
     * Spacing between all elements
     */
    gap?: number;

    /**
     * The flow direction of the content
     */
    direction?: "row" | "column";
}