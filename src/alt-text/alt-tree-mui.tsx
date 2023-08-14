import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

import type { AltGoslingSpec, AltTrack } from 'src/alt-text/alt-gosling-schema';
import type { Datum } from 'src/core/gosling.schema';


function createTreeItemLeaf(id: string, label: string, item: string | number | boolean) {
    item = item as string;
    return (
        <TreeItem key={id} nodeId={id} label={label + ': ' + item}></TreeItem>
    )
}



export function createTreeMUI(data: AltGoslingSpec) {
    return (
        <TreeView
            className = 'tree-view'
            aria-label="Hierarchical tree describing displayed Gosling visualization."
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpanded={['root', 'tree']}
            defaultExpandIcon={<ChevronRightIcon />}
        >
            <TreeItem key='tree' nodeId='tree' label='Automatic description'>

                {createTreeItemLeaf('alt', 'Short description (alt-text)', data.alt)}

                {createTreeItemLeaf('desc', 'Full description', data.longDescription)}
                
                <TreeItem key={'global-details'} nodeId={'global-details'} label={'Details'}>
                    
                    {data.title ? (
                        createTreeItemLeaf('title', 'Title', data.title)
                    ): null}

                    {data.subtitle ? (
                        createTreeItemLeaf('subtitle', 'Subtitle', data.subtitle)
                    ): null}    

                    <TreeItem key={'composition'} nodeId={'composition'} label={'Composition'}>
                        {createTreeItemLeaf('composition-desc', 'Description', data.composition.description)}
                        <TreeItem key={'composition-details'} nodeId={'composition-details'} label={'Details'}>
                        </TreeItem>
                        {createTreeItemLeaf('composition-details-nTracks', 'Number of tracks', data.composition.nTracks)}
                    

                    </TreeItem>

                    <TreeItem key='tracks' nodeId='tracks' label={'Tracks'}>
                        {Object.keys(data.tracks).map(t => (createTreeTrackMUI(data.tracks[t as any])))}
                    </TreeItem>
                    

                </TreeItem>
            
            </TreeItem>
    
        </TreeView>
    );
  }




function createTreeTrackMUI(t: AltTrack) {
    if(t.uid === 'unknown') {
        t.uid = t.position.details.trackNumber.toString()
    }

    return (
        <TreeItem key={'T-'+t.uid} nodeId={'T-'+t.uid} label={'Track: '+t.uid}>
            {createTreeItemLeaf('T-'+t.uid+'-desc', 'Description', t.description)}

            <TreeItem key={'T-'+t.uid+'-details'} nodeId={'T-'+t.uid+'details'} label={'Details'}>  

                {t.title ? (
                    <TreeItem key={'T-'+t.uid+'details-title'} nodeId={'T-'+t.uid+'details-title'} label={'Title: '+t.title}></TreeItem>
                ): null}   

                {t.type ? (
                    <TreeItem key={'T-'+t.uid+'details-type'} nodeId={'T-'+t.uid+'details-type'} label={'Type: '+t.type}></TreeItem>
                ): null}

                <TreeItem key={'T-'+t.uid+'-details-pos'} nodeId={'T-'+t.uid+'-details-pos'} label={'Position'}>
                    {createTreeItemLeaf('T-'+t.uid+'-details-pos-desc', 'Description', t.position.description)}
                    <TreeItem key={'T-'+t.uid+'-details-pos-details'} nodeId={'T-'+t.uid+'-details-pos-details'} label={'Details'}>
                        {createTreeItemLeaf('T-'+t.uid+'-details-pos-details-trackN', 'Track number', t.position.details.trackNumber)} 
                        {createTreeItemLeaf('T-'+t.uid+'-details-pos-details-rowN', 'Row number', t.position.details.rowNumber)} 
                        {createTreeItemLeaf('T-'+t.uid+'-details-pos-details-colN', 'Column number', t.position.details.colNumber)}  
                    </TreeItem>
                </TreeItem>


                <TreeItem key={'T-'+t.uid+'details-app'} nodeId={'T-'+t.uid+'details-app'} label={'Appearance'}>
                    {createTreeItemLeaf('T-'+t.uid+'-details-app-desc', 'Description', t.appearance.description)}
                    <TreeItem key={'T-'+t.uid+'-details-app-details'} nodeId={'T-'+t.uid+'-details-app-details'} label={'Details'}>
                        {createTreeItemLeaf('T-'+t.uid+'-details-pos-details-mark', 'Mark', t.appearance.details.mark)} 
                            <TreeItem key={'T-'+t.uid+'-details-app-details-encodings'} nodeId={'T-'+t.uid+'-details-app-encodings'} label={'Encodings'}>
                                <TreeItem key={'T-'+t.uid+'-details-app-details-encodings-field'} nodeId={'T-'+t.uid+'-details-app-encodings-field'} label={'Encodings dependent on data fields'}>
                                    {Object.keys(t.appearance.details.encodings.encodingField).map(e => (
                                        <TreeItem key={'T-'+t.uid+'-details-app-details-encodings-field-'+e} nodeId={'T-'+t.uid+'-details-app-encodings-field-'+e} label={e}>
                                            {createTreeItemLeaf('T-'+t.uid+'-details-app-details-encodings-field-'+e+'-field', 'Field', t.appearance.details.encodings.encodingField[e].field)}
                                            {createTreeItemLeaf('T-'+t.uid+'-details-app-details-encodings-field-'+e+'-type', 'Type', t.appearance.details.encodings.encodingField[e].type)}
                                            {t.appearance.details.encodings.encodingField[e].axis ? (
                                                createTreeItemLeaf('T-'+t.uid+'-details-app-details-encodings-field-'+e+'-axis', 'Axis', t.appearance.details.encodings.encodingField[e].axis)
                                            ):null}
                                        </TreeItem>
                                    ))}
                                </TreeItem>
                                <TreeItem key={'T-'+t.uid+'-details-app-details-encodings-static'} nodeId={'T-'+t.uid+'-details-app-encodings-static'} label={'Static encodings'}>
                                    {Object.keys(t.appearance.details.encodings.encodingStatic).map(e => (
                                        <TreeItem key={'T-'+t.uid+'-details-app-details-encodings-static-'+e} nodeId={'T-'+t.uid+'-details-app-encodings-static-'+e} label={e}>
                                            {createTreeItemLeaf('T-'+t.uid+'-details-app-details-encodings-static-'+e+'-value', 'Value', t.appearance.details.encodings.encodingStatic[e].value)}
                                        </TreeItem>
                                    ))}
                                </TreeItem>
                            </TreeItem>
                        {createTreeItemLeaf('T-'+t.uid+'-details-pos-details-layout', 'Layout (linear or circular)', t.appearance.details.layout)} 
                        {createTreeItemLeaf('T-'+t.uid+'-details-pos-details-overlaid', 'Overlaid', t.appearance.details.overlaid)}   
                    </TreeItem>
                </TreeItem>

                <TreeItem key={'T-'+t.uid+'details-data'} nodeId={'T-'+t.uid+'details-data'} label={'Data'}>
                    {createTreeItemLeaf('T-'+t.uid+'-details-data-desc', 'Description', t.data.description)}
                    <TreeItem key={'T-'+t.uid+'-details-data-details-stats'} nodeId={'T-'+t.uid+'-details-data-details-stats'} label={'Data statistics'}>
                        <TreeItem key={'T-'+t.uid+'-details-data-details-stats-genomic'} nodeId={'T-'+t.uid+'-details-data-details-stats-genomic'} label={'Genomic range'}>
                            {createTreeItemLeaf('T-'+t.uid+'-details-data-details-stats-genomic-min', 'Minimum', t.data.details.dataStatistics?.genomicMin)}    
                            {createTreeItemLeaf('T-'+t.uid+'-details-data-details-stats-genomic-max', 'Maximum', t.data.details.dataStatistics?.genomicMax)}
                        </TreeItem>
                        <TreeItem key={'T-'+t.uid+'-details-data-details-stats-value'} nodeId={'T-'+t.uid+'-details-data-details-stats-value'} label={'Value range'}>
                            <TreeItem key={'T-'+t.uid+'-details-data-details-stats-value-min'} nodeId={'T-'+t.uid+'-details-data-details-stats-value-min'} label={'Minimum: ' + t.data.details.dataStatistics?.valueMin}>
                                {createTreeItemLeaf('T-'+t.uid+'-details-data-details-stats-value-min-genomic', 'Found at position(s): ', t.data.details.dataStatistics?.valueMinGenomic.toString())}    
                            </TreeItem>
                            <TreeItem key={'T-'+t.uid+'-details-data-details-stats-value-max'} nodeId={'T-'+t.uid+'-details-data-details-stats-value-max'} label={'Maxmimum: ' + t.data.details.dataStatistics?.valueMax}>
                                {createTreeItemLeaf('T-'+t.uid+'-details-data-details-stats-value-max-genomic', 'Found at position(s): ', t.data.details.dataStatistics?.valueMaxGenomic.toString())}    
                            </TreeItem>
                        </TreeItem>

                        {t.data.details.dataStatistics?.categories ? (
                            <TreeItem key={'T-'+t.uid+'-details-data-details-stats-category'} nodeId={'T-'+t.uid+'-details-data-details-stats-category'} label={'Categories'}>
                                {createTreeItemLeaf('T-'+t.uid+'-details-data-details-stats-category-list', 'Categories', t.data.details.dataStatistics.categories)}    
                            </TreeItem>
                        ): null}
                    </TreeItem>
                    <TreeItem key={'T-'+t.uid+'-details-data-details-rawdata'} nodeId={'T-'+t.uid+'-details-data-details-rawdata'} label={'Raw data table'}>
                        {t.data.details.dataStatistics?.flatTileData ? (
                            <table>
                                <tbody>
                                    <tr>
                                        {Object.keys(
                                            (t.data.details.dataStatistics?.flatTileData[0])
                                        ).map((field: string, i: number) => (
                                            <th key={i}>{field}</th>
                                        ))}
                                    </tr>
                                    {t.data.details.dataStatistics?.flatTileData.map(
                                        (row: Datum, i: number) => (
                                            <tr key={i}>
                                                {Object.keys(row).map(
                                                    (field: string, j: number) => (
                                                        <td key={j}>
                                                            {row[field]?.toString()}
                                                        </td>
                                                    )
                                                )}
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                            
                        ): null}       
                    </TreeItem>
                </TreeItem>
            </TreeItem>
        </TreeItem>
    );
}


// function createTreeTrackMUI(t: AltTrack) {
//     return (
//         <TreeItem key={t.uid} nodeId={t.uid} label={'Track: ' + t.uid}>
//             <TreeItem key={t.uid + 'desc'} nodeId={t.uid + 'desc'} label={'Description: ' + t.description}></TreeItem>
//             <TreeItem key={t.uid + 'details'} nodeId={t.uid + 'details'} label={'Details'}>     
//                 <TreeItem key={t.uid + 'details-pos'} nodeId={t.uid + 'details-pos'} label={'Position'}>
//                     <TreeItem key={t.uid + 'details-pos-desc'} nodeId={t.uid + 'details-pos-desc'} label={'Description: ' + t.position.description}></TreeItem>
//                     <TreeItem key={t.uid + 'details-pos-details'} nodeId={t.uid + 'details-pos-details'} label={'Details'}>
//                         <TreeItem key={t.uid + 'details-pos-details-colN'} nodeId={t.uid + 'details-pos-details-colN'} label={'Column number: ' + t.position.details.colNumber}></TreeItem>
//                         <TreeItem key={t.uid + 'details-pos-details-rowN'} nodeId={t.uid + 'details-pos-details-rowN'} label={'Row number: ' + t.position.details.rowNumber}></TreeItem>
//                     </TreeItem>
//                 </TreeItem>
//                 {t.title ? (
//                         <TreeItem key={t.uid + 'details-title'} nodeId={t.uid + 'details-title'} label={'Title: ' + t.title}></TreeItem>
//                     ): null}
//                 {t.type ? (
//                         <TreeItem key={t.uid + 'details-type'} nodeId={t.uid + 'details-type'} label={'Type: ' + t.type}></TreeItem>
//                     ): null}
//                 <TreeItem key={t.uid + 'details-app'} nodeId={t.uid + 'details-app'} label={'Appearance'}>
//                     <TreeItem key={t.uid + 'details-app-desc'} nodeId={t.uid + 'details-app-desc'} label={'Description: ' + t.appearance.description}></TreeItem>
//                     <TreeItem key={t.uid + 'details-app-details'} nodeId={t.uid + 'details-app-details'} label={'Details'}>
//                         <TreeItem key={t.uid + 'details-app-details-mark'} nodeId={t.uid + 'details-app-desc-mark'} label={'Mark: ' + t.appearance.details.mark}></TreeItem>
//                     </TreeItem>
//                 </TreeItem>
//                 <TreeItem key={t.uid + 'details-data'} nodeId={t.uid + 'details-data'} label={'Data'}>
//                     <TreeItem key={t.uid + 'details-data-desc'} nodeId={t.uid + 'details-data-desc'} label={'Description: ' + t.data.description}></TreeItem>
//                     <TreeItem key={t.uid + 'details-data-details'} nodeId={t.uid + 'details-data-details'} label={'Details'}>
//                         <TreeItem key={t.uid + 'details-data-details-stats'} nodeId={t.uid + 'details-app-desc-stats'} label={'Computed statistics'}>
//                             <TreeItem key={t.uid + 'details-data-details-stats-genomicrange'} nodeId={t.uid + 'details-app-desc-stats-genomicrange'} label={'Genomic range: ' + t.data.details.dataStatistics?.genomicMax}></TreeItem>
//                         </TreeItem>
//                     </TreeItem>
//                 </TreeItem>

//             </TreeItem>
//         </TreeItem>
//       );
// }

// function createTreeParent(data: any, id: string, label: string) {
//     return (
//         <TreeItem key={id} nodeId={id} label={label}>
//             <TreeItem key={id} nodeId={id} label={label}></TreeItem>
//             <TreeItem key={id} nodeId={id} label={label}></TreeItem>
//         </TreeItem>
//     )
//     //give name
//     //descr
//     //details
// }

// function createTreeItemDescription(id: string, desc: string) {
//     return (
//         <TreeItem key={id} nodeId={id} label={'Description'}>
//              <TreeItem key={id} nodeId={id + '-L'} label={desc}></TreeItem>
//         </TreeItem>
//     )
// }

// function createTreeItemLeaf(id: string, label: string, desc: string) {
//     return (
//         <TreeItem key={id} nodeId={id} label={label}>
//              <TreeItem key={id} nodeId={id + '-L'} label={desc}></TreeItem>
//         </TreeItem>
//     )
// }

// function createTreeItemWithChildren(id: string, label: string, children: string[]) {
//     return (
//         <TreeItem key={id} nodeId={id} label={label}>
//              <TreeItem key={id} nodeId={id + '-L'} label={desc}></TreeItem>
//         </TreeItem>
//     )
// }


// function createTreeItemDetails(id: string, desc: string) {
//     return (
//         <TreeItem key={id} nodeId={id} label={'Details'}>
//              {/* <TreeItem key={id} nodeId={id + '-L'} label={desc}></TreeItem> */}
//         </TreeItem>
//     )
// }

               
                {/* <TreeItem key={'desc'} nodeId={'desc'} label={'Description: ' + data.longDescription}></TreeItem>
    
                <TreeItem key={'global-details'} nodeId={'global-details'} label={'Details'}>
                    {data.title ? (
                        <TreeItem key={'title'} nodeId={'title'} label={'Title: ' + data.title}></TreeItem>
                    ): null}
    
                    {data.subtitle ? (
                        <TreeItem key={'subtitle'} nodeId={'subtitle'} label={'Subtitle: ' + data.subtitle}></TreeItem>
                    ): null}
    
                    <TreeItem key={'composition'} nodeId={'composition'} label={'Composition'}>
                        <TreeItem key={'composition-desc'} nodeId={'composition-desc'} label={'Description: ' + data.composition.description}></TreeItem>
                        <TreeItem key={'composition-details'} nodeId={'composition-details'} label={'Details'}>
                            <TreeItem key={'composition-details-nTracks'} nodeId={'composition-details-nTracks'} label={'Number of tracks: ' + data.composition.nTracks}></TreeItem>
                        </TreeItem>
                    </TreeItem>
    
                    <TreeItem key='tracks' nodeId='tracks' label={'Tracks'}>
                        {Object.keys(data.tracks).map(t => (createTreeTrackMUI(data.tracks[t as any])))}
                    </TreeItem>
    
                </TreeItem>  */}


// function createTreeLeaf(id: string, label: string) {
//     return (
//         <TreeItem key={id} nodeId={id} label={label}></TreeItem>
//     )
// }

// export function createTreeMUI(data: AltGoslingSpec) {
//   return (
//     <TreeView
//       aria-label="rich object"
//       defaultCollapseIcon={<ExpandMoreIcon />}
//       defaultExpanded={['root']}
//       defaultExpandIcon={<ChevronRightIcon />}
//       sx={{ overflow: 'scroll' }}
//     >
//         <TreeItem key='tree' nodeId='tree' label='Automatic description'>

//             <TreeItem key={'alt'} nodeId={'alt'} label={'Alt: ' + data.alt}></TreeItem>
//             <TreeItem key={'desc'} nodeId={'desc'} label={'Description: ' + data.longDescription}></TreeItem>

//             <TreeItem key={'global-details'} nodeId={'global-details'} label={'Details'}>
//                 {data.title ? (
//                     <TreeItem key={'title'} nodeId={'title'} label={'Title: ' + data.title}></TreeItem>
//                 ): null}

//                 {data.subtitle ? (
//                     <TreeItem key={'subtitle'} nodeId={'subtitle'} label={'Subtitle: ' + data.subtitle}></TreeItem>
//                 ): null}

//                 <TreeItem key={'composition'} nodeId={'composition'} label={'Composition'}>
//                     <TreeItem key={'composition-desc'} nodeId={'composition-desc'} label={'Description: ' + data.composition.description}></TreeItem>
//                     <TreeItem key={'composition-details'} nodeId={'composition-details'} label={'Details'}>
//                         <TreeItem key={'composition-details-nTracks'} nodeId={'composition-details-nTracks'} label={'Number of tracks: ' + data.composition.nTracks}></TreeItem>
//                     </TreeItem>
//                 </TreeItem>

//                 <TreeItem key='tracks' nodeId='tracks' label={'Tracks'}>
//                     {Object.keys(data.tracks).map(t => (createTreeTrackMUI(data.tracks[t as any])))}
//                 </TreeItem>

//             </TreeItem> 
        
//         </TreeItem>

//     </TreeView>
//   );
// }