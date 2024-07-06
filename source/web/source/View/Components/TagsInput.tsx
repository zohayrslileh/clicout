import { TagsInput } from "react-tag-input-component"
import styled from "@emotion/styled"

/**
 * Tags Input
 * 
 * @returns 
 */
export default function ({ ...props }: React.ComponentProps<typeof TagsInput>) {

    return <Container className="h-fit min-h-[140px] relative w-full tap-highlight-transparent shadow-sm px-3 border-medium border-default-200 data-[hover=true]:border-default-400 group-data-[focus=true]:border-default-foreground rounded-medium flex-col items-start justify-center gap-0 transition-background !duration-150 motion-reduce:transition-none py-2">
        <TagsInput {...props} />
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`

    .rti--container {
        background-color: transparent;
        border: none !important;
        outline: none !important;
        box-shadow: none !important;
    }

    .rti--tag {
        background-color: hsl(var(--nextui-default) / 0.4);
        padding-inline-start: 12px;
    }
    
    .rti--input {
        background-color: transparent;
    }
`