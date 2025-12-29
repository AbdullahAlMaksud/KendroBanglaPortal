'use client';

import dynamic from 'next/dynamic';
import 'easymde/dist/easymde.min.css';

const SimpleMdeReact = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

export default SimpleMdeReact;
