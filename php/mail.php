<?php
$post_date = file_get_contents("php://input");
$data = json_decode($post_date);

if ( isset($data->name) && isset($data->phone) && isset($data->email) 
        && isset($data->project) && isset($data->idea) ) {
        
        $name = stripslashes(trim(strip_tags($data->name)));
        $phone = stripslashes(trim(strip_tags($data->phone)));
        $email = stripslashes(trim(strip_tags($data->email)));
        $project = stripslashes(trim(strip_tags($data->project)));
        $idea = stripslashes(trim(strip_tags($data->idea)));
         
        $title = '"WebGoPro, Inc."';
        $mess =  "<b>Имя:</b> $name;<br /><br />
                  <b>Телефон:</b> $phone;<br /><br />
                  <b>Имейл:</b> $email;<br /><br />
                  <b>Бюджет:</b> $project;<br /><br />
                  <b>Идеи:</b> $idea;<br /><br />";

        $to = "info.predel@gmail.com".", ";
        $to .= "info.predel@gmail.com";

        $from="info@gooddeeds.com";
        $file_name = "../img/logo.png";  // Прикрепляемый файл

        function sendMail($to, $from, $title, $mess, $file_name) {
                $bound = "separator"; // Разделитель, по которому будет отделяться письмо от файла
                $header="From: $from\n"; // От кого
                //$header.="To: $to\n"; // Кому
                $header.="Subject: $title\r\n"; // Тема письма
                $header.="Mime-Version: 1.0\n";
                $header.="Content-Type: multipart/mixed; boundary=\"$bound\"";

                 // Записываем в переменную первую часть письма
                $body="\n\n--$bound\n";
                $body.="Content-type: text/html; charset=\"UTF-8\"\n";
                $body.="Content-Transfer-Encoding: quoted-printable\n\n";
                $body.="$mess";

                $file=fopen($file_name,"rb"); // Открываем отправляемый файл

                // Записываем в переменную вторую часть письма
                $body.="\n\n--$bound\n";
                $body.="Content-Type: application/octet-stream;";
                $body.="name=\"".basename($file_name)."\"\n";
                $body.="Content-Transfer-Encoding:base64\n";
                $body.="Content-Disposition:attachment\n\n";
                $body.=base64_encode(fread($file,filesize($file_name)))."\n";
                $body.="$bound--\n\n";

                // Отправляем
                 mail($to, $title, $body, $header);
                 exit;
            };


  sendMail($to, $from, $title, $mess, $file_name);
 }
?>