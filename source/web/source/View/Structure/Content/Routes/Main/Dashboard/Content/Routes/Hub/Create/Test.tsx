import usePromise from "@/Tools/Promise";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useState } from "react";

export default function () {

    const [search, setSearch] = useState("")

    const qfsfqf = usePromise(async function () {

        let res = await fetch(`https://swapi.py4e.com/api/people/?search=${search}`);

        const lfdfs = await res.json()

        return lfdfs.results

    }, [search])

    return (
        <Autocomplete
            className="max-w-xs"
            inputValue={search}
            isLoading={qfsfqf.pending}
            items={qfsfqf.solve || []}
            label="Select a character"
            placeholder="Type to search..."
            variant="bordered"
            onInputChange={setSearch}
        >
            {(item) => (
                <AutocompleteItem key={item.name} className="capitalize">
                    {item.name}
                </AutocompleteItem>
            )}
        </Autocomplete>
    );
}
