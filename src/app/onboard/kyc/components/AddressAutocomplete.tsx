import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

interface AddressComponents {
    long_name: string;
    short_name: string;
    types: string[];
}

interface PlaceDetails {
    formatted_address: string;
    address_components: AddressComponents[];
    name: string;
}

interface AddressAutocompleteProps {
    onPlaceSelect: (place: PlaceDetails) => void;
    formattedAddress: string;
}

export default ({
    onPlaceSelect,
    formattedAddress,
}: AddressAutocompleteProps) => {
    const [searchValue, setSearchValue] = useState("");
    const [showPredictions, setShowPredictions] = useState(false);

    const {
        placesService,
        placePredictions,
        getPlacePredictions,
        isPlacePredictionsLoading,
    } = usePlacesService({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        options: {
            types: ["street_address"],
            componentRestrictions: { country: "us" },
        },
    });

    const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const value = evt.target.value;
        setSearchValue(value);
        setShowPredictions(true);
        getPlacePredictions({ input: value });
    };

    const handlePlaceSelect = (prediction: {
        place_id: string;
        description: string;
    }) => {
        placesService?.getDetails(
            {
                placeId: prediction.place_id,
            },
            (placeDetails: PlaceDetails) => {
                onPlaceSelect(placeDetails);
                setSearchValue(placeDetails.formatted_address);
                setShowPredictions(false);
            }
        );
    };

    // Initialize with formattedAddress if provided
    useEffect(() => {
        if (formattedAddress && !searchValue) {
            setSearchValue(formattedAddress);
        }
    }, [formattedAddress]);

    return (
        <div className="relative">
            <Input
                placeholder="Enter your address"
                value={searchValue}
                onChange={handleInputChange}
                aria-label="Search address"
            />
            <div className="text-transparent h-0 w-0 absolute">
                show predictions: {showPredictions ? "true" : "false"}
            </div>
            {showPredictions &&
                (isPlacePredictionsLoading || placePredictions.length > 0) && (
                    <div className="absolute w-full z-50 mt-1">
                        <Command className="rounded-lg border-[#D9D9D9] border-[1px] bg-white">
                            <CommandList>
                                <CommandGroup>
                                    {isPlacePredictionsLoading ? (
                                        <CommandItem disabled>
                                            Loading...
                                        </CommandItem>
                                    ) : (
                                        placePredictions.map((prediction) => (
                                            <CommandItem
                                                key={prediction.place_id}
                                                onSelect={() =>
                                                    handlePlaceSelect(
                                                        prediction
                                                    )
                                                }
                                            >
                                                {prediction.description}
                                            </CommandItem>
                                        ))
                                    )}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </div>
                )}
        </div>
    );
};
