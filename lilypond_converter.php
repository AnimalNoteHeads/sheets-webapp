<?php

    // Initializing necessary constants
    const CACHE_FILE_LIFETIME = 60*60;
    const CACHE_PATH = "cache/conversions";
    const SERVER_PATH = "/var/www/html";
    const CACHE_SERVER_PATH = SERVER_PATH."/".CACHE_PATH;
    
    // Initial cache cleaner
    $files = scandir('folder/');
    foreach($files as $file) {
        if(time()-CACHE_FILE_LIFETIME > filemtime($file)) {
            unlink($file);
        }
    }

    // Check if the service has necessary data
    if(isset($_POST['lilypond_code'])) {
        $lilypond_code = $_POST['lilypond_code'];
        
        $lilypond_code = "language = \"da\"\n"
                        ."songtitle = \"Lille Peter Edderkop\"\n"
                        ."arranger = \"Andreas Larsen\"\n"
                        ."music = {\n"
                        ."  \\key c \\major\n"
                        .$lilypond_code;
        $lilypond_code .= "\bar \"|.\"\n"
                        ."}\n\n"
                        ."\\include \"".SERVER_PATH."/scripts/AnimalNoteHeads.ly\"";
        
    } else {
        exit("Lilypond code was not found in the POST");
    }
    
    // Creating new .ly file in the cache
    $ly_filename = md5($lilypond_code.microtime().rand(0, 999999999));
    $ly_filename_full = $ly_filename.".ly";
    $ly_path = CACHE_PATH."/".$ly_filename_full;
    $ly_path_full = CACHE_SERVER_PATH."/".$ly_filename_full;
    file_put_contents($ly_path, $lilypond_code);
    
    // Creating new .pdf file in the cache
    $pdf_filename_full = $ly_filename.".pdf";
    $pdf_path = CACHE_PATH."/".$pdf_filename_full;
    $pdf_path_full = CACHE_SERVER_PATH."/".$pdf_filename_full;
    
    $conversion_command = "lilypond -o"
            ." ".CACHE_SERVER_PATH."/"
            ." ".$ly_path_full;
    shell_exec($conversion_command);
    
    echo $pdf_path;
?>
