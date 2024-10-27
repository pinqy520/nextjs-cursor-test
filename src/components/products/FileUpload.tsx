"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface FileUploadProps {
  type: 'image' | 'document';
  value?: string;
  onChange: (path: string) => void;
  accept: string;
  maxSize?: number;
}

export function FileUpload({
  type,
  value,
  onChange,
  accept,
  maxSize = 5 * 1024 * 1024,
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 验证文件大小
    if (file.size > maxSize) {
      toast({
        title: '上传失败',
        description: '文件大小不能超过5MB',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);
      if (value) {
        formData.append('oldPath', value);
      }

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error);
      }

      onChange(data.path);
      toast({
        title: '上传成功',
      });
    } catch (error) {
      toast({
        title: '上传失败',
        description: error instanceof Error ? error.message : '未知错误',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      {value && type === 'image' && (
        <div className="relative w-20 h-20">
          <img
            src={value}
            alt="上传预览"
            className="w-full h-full object-cover rounded"
          />
        </div>
      )}
      {value && type === 'document' && (
        <div className="flex items-center gap-2">
          <svg
            className="w-6 h-6 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span className="text-sm text-gray-500">已上传文档</span>
        </div>
      )}
      <Button
        type="button"
        variant="outline"
        disabled={isUploading}
        onClick={() => document.getElementById('fileInput')?.click()}
      >
        {isUploading ? '上传中...' : value ? '更换文件' : '上传文件'}
      </Button>
      <input
        id="fileInput"
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
