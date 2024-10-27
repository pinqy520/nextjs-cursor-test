"use client"

import { Product } from '@/types/product';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  return (
    <div className="grid gap-6">
      {/* 基本信息 */}
      <Card>
        <CardHeader>
          <CardTitle>基本信息</CardTitle>
          <CardDescription>产品的基本信息</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">产品名称</label>
              <p className="mt-1">{product.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">产品类型</label>
              <p className="mt-1">{product.type}</p>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">产品描述</label>
            <p className="mt-1">{product.description || '暂无描述'}</p>
          </div>
          {product.imageUrl && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">产品图片</label>
              <div className="mt-1">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-40 w-40 object-cover rounded"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 接入信息 */}
      <Card>
        <CardHeader>
          <CardTitle>接入信息</CardTitle>
          <CardDescription>产品的接入配置信息</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">产品ID</label>
              <p className="mt-1">{product.id}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">API版本</label>
              <p className="mt-1">{product.apiVersion || '暂无'}</p>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Webhook URL</label>
            <p className="mt-1">{product.webhookUrl}</p>
          </div>
          {product.notifyConfig && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">通知配置</label>
              <pre className="mt-1 p-2 bg-muted rounded text-sm">
                {JSON.stringify(product.notifyConfig, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 法务信息 */}
      <Card>
        <CardHeader>
          <CardTitle>法务信息</CardTitle>
          <CardDescription>产品的法务相关文件</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {product.licenseUrl && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">营业执照</label>
              <div className="mt-1">
                <a
                  href={product.licenseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  查看营业执照
                </a>
              </div>
            </div>
          )}
          {product.qualificationUrls.length > 0 && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">资质证明文件</label>
              <div className="mt-1 space-y-1">
                {product.qualificationUrls.map((url, index) => (
                  <div key={url}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      查看资质文件 {index + 1}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 元数据 */}
      <Card>
        <CardHeader>
          <CardTitle>其他信息</CardTitle>
          <CardDescription>产品的其他元数据信息</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">创建时间</label>
            <p className="mt-1">{new Date(product.createdAt).toLocaleString()}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">更新时间</label>
            <p className="mt-1">{new Date(product.updatedAt).toLocaleString()}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">创建者</label>
            <p className="mt-1">{product.createdBy}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">状态</label>
            <p className="mt-1">{product.status}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
