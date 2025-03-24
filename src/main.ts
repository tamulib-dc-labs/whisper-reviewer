import { MediaFile } from "./types/media";
import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  // Fetch the media JSON file
  fetch("/transcripts/test_for_whisper_transcript_online.json")
    .then((response) => response.json())
    .then((mediaFiles: MediaFile[]) => {
      // Create the dropdown
      const dropdown = document.createElement("select");
      dropdown.id = "audio-dropdown";

      // Add an option for each media file
      function hasName(file: unknown): file is { name: string } {
  return !!file && typeof file === 'object' && 'name' in file;
}

    mediaFiles.forEach((file, index) => {
          if (hasName(file)) {
            const option = document.createElement("option");
            option.value = index.toString();
            option.textContent = file.name;
            dropdown.appendChild(option);
          } else {
            console.error("File is missing 'name' property:", file);
          }
    });

      // Append the dropdown to the body (or another container)
      document.body.appendChild(dropdown);

      // Create a whisper-transcript element (initially empty)
      let whisperElement = document.createElement("whisper-transcript");
      document.body.appendChild(whisperElement);

      // Function to update the whisper-transcript element when dropdown selection changes
      const updateWhisperTranscript = (index: number) => {
        const selectedFile = mediaFiles[index];

        // Remove the current whisper-transcript element from the DOM
        document.body.removeChild(whisperElement);

        // Create a new whisper-transcript element
        whisperElement = document.createElement("whisper-transcript");
        whisperElement.setAttribute("audio", selectedFile.audio);
        whisperElement.setAttribute("url", selectedFile.url);

        // Append the new element to the DOM
        document.body.appendChild(whisperElement);

        // Assuming whisper-transcript has an open shadow DOM
        const shadowRoot = whisperElement.shadowRoot;
        if (shadowRoot) {
          const mediaDiv = shadowRoot.querySelector('.media');
          if (mediaDiv instanceof HTMLElement) {
            mediaDiv.style.position = 'sticky';
            mediaDiv.style.top = '0';
            mediaDiv.style.backgroundColor = '#fff';
            mediaDiv.style.zIndex = '10';
          }
        }

      };

      // Event listener to update on dropdown change
      dropdown.addEventListener("change", (event) => {
        const index = parseInt((event.target as HTMLSelectElement).value);
        updateWhisperTranscript(index);
      });

      // Set the initial state
      updateWhisperTranscript(0); // Set the first item as default
    })
    .catch((error) => {
      console.error("Error loading media files:", error);
    });
});
