import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

interface AddressAutocompleteProps {
    onPlaceSelect: (place: PlaceDetails) => void;
}

export default ({ onPlaceSelect }: AddressAutocompleteProps) => {
    const {
        placesService,
        placePredictions,
        getPlacePredictions,
        isPlacePredictionsLoading,
    } = usePlacesService({
        apiKey: process.env.REACT_APP_GOOGLE,
    });

    useEffect(() => {
        // fetch place details for the first element in placePredictions array
        if (placePredictions.length) {
            placesService?.getDetails(
                {
                    placeId: placePredictions[0].place_id,
                },
                (placeDetails: PlaceDetails) => onPlaceSelect(placeDetails)
            );
        }
    }, [placePredictions, placesService, onPlaceSelect]);

    const renderPrediction = (
        prediction: google.maps.places.AutocompletePrediction
    ) => (
        <div
            key={prediction.place_id}
            className="p-2 hover:bg-gray-100 cursor-pointer"
        >
            {prediction.description}
        </div>
    );

    return (
        <>
            <Input
                placeholder="Debounce 500 ms"
                onChange={(evt) => {
                    getPlacePredictions({ input: evt.target.value });
                }}
                aria-label="Search address"
            />
            {isPlacePredictionsLoading && <div>Loading...</div>}
            {placePredictions.map(renderPrediction)}
        </>
    );
};
