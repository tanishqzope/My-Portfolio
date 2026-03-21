import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../context/SoundContext';

const HACKER_TEXT = `
#include <stdio.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <string.h>
#include <stdlib.h>

// INITIALIZING SECURE SHELL PAYLOAD
// TARGET IDENTIFIED: MAINFRAME_001
// EXECUTING KERNEL EXPLOIT...

int main(int argc, char *argv[]) {
    struct sockaddr_in server_addr;
    int sock_fd;
    char buffer[1024] = "GET / HTTP/1.1\\r\\nHost: target.local\\r\\n\\r\\n";

    printf("[*] Resolving target IP address...\\n");
    sleep(1);
    printf("[+] Target resolved to 192.168.1.100\\n");
    
    sock_fd = socket(AF_INET, SOCK_STREAM, 0);
    if (sock_fd < 0) {
        perror("[-] Socket creation failed");
        return 1;
    }
    printf("[+] Socket created successfully.\\n");

    server_addr.sin_family = AF_INET;
    server_addr.sin_port = htons(80);
    inet_pton(AF_INET, "192.168.1.100", &server_addr.sin_addr);

    printf("[*] Attempting to connect to target...\\n");
    if (connect(sock_fd, (struct sockaddr *)&server_addr, sizeof(server_addr)) < 0) {
        perror("[-] Connection failed");
        return 1;
    }
    printf("[+] Connected! Injecting payload...\\n");

    send(sock_fd, buffer, strlen(buffer), 0);
    printf("[+] Payload delivered. Awaiting reverse shell...\\n");
    
    // BYPASSING FIREWALL...
    // OVERRIDING ADMIN CREDENTIALS...
    // ACCESS GRANTED.
    
    while(1) {
        printf("root@target:~# ");
        fflush(stdout);
        sleep(2);
        printf("cat /etc/shadow | grep root\\n");
        sleep(1);
        printf("root:$6$xyz...:18000:0:99999:7:::\\n");
        sleep(1);
        printf("root@target:~# ");
        fflush(stdout);
        sleep(2);
        printf("SUCCESS: SYSTEM COMPROMISED.\\n");
        break;
    }

    close(sock_fd);
    return 0;
}

// DOWNLOADING CLASSIFIED DATA...
// 10%... 40%... 80%... 100%
// ERASING LOGS...
// DISCONNECTING.
`;

export default function HackerTyper({ onClose }) {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);
  const { playKeyboardClick, playAccessGranted } = useSound();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent default browser shortcuts like scrolling when typing
      if (e.key !== 'Escape' && e.key !== 'F11' && e.key !== 'F12') {
        e.preventDefault();
      }

      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Add a chunk of text on every key press
      const chunkSize = Math.floor(Math.random() * 5) + 3; // 3 to 7 chars
      const nextIndex = Math.min(index + chunkSize, HACKER_TEXT.length);
      
      setDisplayedText(HACKER_TEXT.substring(0, nextIndex));
      setIndex(nextIndex);

      if (index < HACKER_TEXT.length) {
          playKeyboardClick();
      }
      if (nextIndex >= HACKER_TEXT.length && index < HACKER_TEXT.length) {
          playAccessGranted();
      }

      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [index, onClose]);

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] bg-black pointer-events-auto flex flex-col"
      >
        <div 
          ref={containerRef}
          className="w-full h-full p-6 sm:p-10 font-mono text-sm sm:text-lg text-[#00ff41] leading-relaxed overflow-y-auto whitespace-pre-wrap select-none"
        >
          {displayedText}
          {index >= HACKER_TEXT.length && (
            <div className="mt-8 animate-pulse text-red-500 font-bold text-2xl">
              ACCESS GRANTED
              <br/>
              <span className="text-sm font-normal text-cyber-textPrimary">Press ESC to exit</span>
            </div>
          )}
          <span className="inline-block w-3 h-5 bg-[#00ff41] animate-blink align-middle ml-1 -mb-1"></span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
