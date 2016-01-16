<?php

    // Initializing necessary constants
    const CACHE_FILE_LIFETIME = 60*60;
    const CACHE_PATH = "cache/conversions";
    const SERVER_PATH = "/var/www/html";
    const CACHE_SERVER_PATH = SERVER_PATH."/".CACHE_PATH;
    const LILYPOND_DATA_PATH = "/usr/share/lilypond/2.18.2/fonts/svg";

    // Initial cache cleaner
    $files = scandir('folder/');
    foreach($files as $file) {
        if(time()-CACHE_FILE_LIFETIME > filemtime($file)) {
            unlink($file);
        }
    }

    // Initializing lilypond heads
//    function recurse_copy($src,$dst) {
//        $dir = opendir($src);
//        @mkdir($dst);
//        while(false !== ( $file = readdir($dir)) ) {
//            if (( $file != '.' ) && ( $file != '..' )) {
//                if ( is_dir($src . '/' . $file) ) {
//                    recurse_copy($src . '/' . $file,$dst . '/' . $file);
//                }
//                else {
//                    copy($src . '/' . $file,$dst . '/' . $file);
//                }
//            }
//        }
//        closedir($dir);
//    }
//    if(!file_exists(LILYPOND_DATA_PATH."/eps")) {
//        recurse_copy("data/eps", LILYPOND_DATA_PATH."/eps");
//    }

    // Check if the service has necessary data
    if(isset($_POST['lilypond_code'])) {

        $lilypond_code = 'language = "'.$_POST["language"].'"';

        $lilypond_code = <<<ABC
songtitle = "Lille Peter Edderkop"
arranger = "Andreas Larsen"
music = {
  \key c \major

ABC;

$lilypond_code .= $_POST['lilypond_code'];

$lilypond_code .= <<<ABC
\bar "|."
}

\include "/var/www/html/scripts/AnimalNoteHeads.ly"
ABC;

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
    $pdf_link = "<a href='/".$pdf_path."'>sheet</a>";

    $conversion_command = "lilypond -o"
            ." ".CACHE_SERVER_PATH."/"
            ." ".$ly_path_full;
    shell_exec($conversion_command);

    echo $pdf_link;
?>
