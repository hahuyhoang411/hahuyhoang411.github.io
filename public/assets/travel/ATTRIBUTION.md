# Representative travel photos

These are **not** Ha's personal travel photos. They are freely licensed representative
images of each country, used to fill the travel panel until personal photos replace them.
Served as 800px-wide WebP, converted from the originals by
`scripts/fetch-travel-photos.mjs`.

## france-representative.jpg

- **Source**: Unsplash (downloaded via images.unsplash.com CDN)
- **URL**: https://images.unsplash.com/photo-1502602898657-3e91760cbb34
- **License**: Unsplash License (free for commercial and noncommercial use, no attribution
  required; attribution appreciated). See https://unsplash.com/license
- **Subject**: Representative image of Paris, France
- **Dimensions**: 800×532 JPEG, ~68 KB

## Wikimedia Commons photos

The `.webp` files below come from Wikimedia Commons. Each entry records the file page,
license, and artist. Licenses are carried over from the Commons file pages; verify before
removing any attribution.

| File | Subject | Source (Commons file page) | License | Artist |
| --- | --- | --- | --- | --- |
| vietnam.webp | Vietnam | https://commons.wikimedia.org/wiki/File:Halong_Bay_in_Vietnam.jpg | CC BY-SA 3.0 | Thomas Hirsch / User:Ravn |
| thailand.webp | Thailand | https://commons.wikimedia.org/wiki/File:Templo_Wat_Arun,_Bangkok,_Tailandia,_2013-08-22,_DD_04.jpg | CC BY-SA 3.0 | Diego Delso |
| singapore.webp | Singapore | https://commons.wikimedia.org/wiki/File:Cricket_match_and_Marina_Bay_Sands_Hotel_in_Singapore.jpg | CC BY-SA 4.0 | Basile Morin |
| myanmar.webp | Myanmar | https://commons.wikimedia.org/wiki/File:20160731_Bagan_temples_6212.jpg | CC BY-SA 4.0 | Jakub Hałun |
| malaysia.webp | Malaysia | https://commons.wikimedia.org/wiki/File:Petronas_Panorama_II.jpg | CC BY-SA 4.0 | Someformofhuman |
| china.webp | China | https://commons.wikimedia.org/wiki/File:Badaling_China_Great-Wall-of-China-01.jpg | CC BY-SA 3.0 | CEphoto, Uwe Aranas |
| taiwan.webp | Taiwan | https://commons.wikimedia.org/wiki/File:Taipei_101_2009_amk.jpg | CC BY-SA 3.0 | AngMoKio |
| south-korea.webp | South Korea | https://commons.wikimedia.org/wiki/File:Gyeonghoeru_(Royal_Banquet_Hall)_at_Gyeongbokgung_Palace,_Seoul.jpg | CC BY-SA 4.0 | Frank Schulenburg |
| switzerland.webp | Switzerland | https://commons.wikimedia.org/wiki/File:Matterhorn_Riffelsee_2005-06-11.jpg | CC BY-SA 3.0 | Dirk Beyer |
| czechia.webp | Czechia | https://commons.wikimedia.org/wiki/File:Prague_skyline_at_dawn.jpg | CC BY-SA 4.0 | Petar Milošević |
| germany.webp | Germany | https://commons.wikimedia.org/wiki/File:Brandenburg_Gate_Quadriga_at_Night.jpg | CC BY-SA 2.5 | א (Aleph); sculpture by Johann Gottfried Schadow |
| belgium.webp | Belgium | https://commons.wikimedia.org/wiki/File:Brussels,_townhall_oeg2043-00090_foto3_2015-06-07_08.38.jpg | CC BY-SA 4.0 | Michielverbeek |
| spain.webp | Spain | https://commons.wikimedia.org/wiki/File:Sagrada_Familia_03.jpg | CC BY-SA 3.0 | Bernard Gagnon |
| italy.webp | Italy | https://commons.wikimedia.org/wiki/File:Colosseum_in_Rome,_Italy_-_April_2007.jpg | CC BY-SA 2.5 | Diliff |
| vatican-city.webp | Vatican City | https://commons.wikimedia.org/wiki/File:Basilica_Sancti_Petri_blue_hour.jpg | CC0 | Jebulon |
| qatar.webp | Qatar | https://commons.wikimedia.org/wiki/File:Doha_Skyline_01.jpg | CC BY 4.0 | Zairon |
| netherlands.webp | Netherlands | https://commons.wikimedia.org/wiki/File:Coymanshuis-detail.jpg | Public domain | Taks |
| greece.webp | Greece | https://commons.wikimedia.org/wiki/File:20101024_Acropolis_panoramic_view_from_Areopagus_hill_Athens_Greece.jpg | CC BY-SA 3.0 | Ggia |

## Replacing them

To replace with personal photos, overwrite the file in `public/assets/travel/` (or update
the `photoPath` entries in `src/components/desktop/DesktopShell.tsx`) and delete the
corresponding entry above. Keep the license/attribution record for any image that is kept
in the repo.
