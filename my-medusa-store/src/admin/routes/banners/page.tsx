import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Photo, Plus, Trash, Pencil } from "@medusajs/icons"
import { Container, Heading, Text, Table, Badge, Button, Drawer, Input, Label, Switch, toast } from "@medusajs/ui"
import { useState, useEffect } from "react"
import { sdk } from "../../lib/client"

const BannersRoute = () => {
    const [banners, setBanners] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)

    const [editingBanner, setEditingBanner] = useState<any>(null)

    // Form states
    const [title, setTitle] = useState("")
    const [targetUrl, setTargetUrl] = useState("")
    const [sortOrder, setSortOrder] = useState("0")
    const [isActive, setIsActive] = useState(true)
    const [file, setFile] = useState<File | null>(null)

    const [isSaving, setIsSaving] = useState(false)

    const fetchBanners = async () => {
        setIsLoading(true)
        try {
            const res = await sdk.client.fetch(`/admin/banners`, { method: "GET" }) as any
            setBanners(res.banners || [])
        } catch (err) {
            toast.error("Failed to fetch banners")
        }
        setIsLoading(false)
    }

    useEffect(() => {
        fetchBanners()
    }, [])

    const resetForm = () => {
        setTitle("")
        setTargetUrl("")
        setSortOrder("0")
        setIsActive(true)
        setFile(null)
        setEditingBanner(null)
    }

    const handleUploadImage = async (fileToUpload: File) => {
        try {
            const { files } = await sdk.admin.upload.create({ files: [fileToUpload as any] })
            return files[0].url
        } catch (e: any) {
            toast.error("Failed to upload image")
            throw e
        }
    }

    const handleCreate = async () => {
        if (!title || !targetUrl) {
            toast.error("Title and URL are required")
            return
        }

        setIsSaving(true)
        try {
            let imageUrl = "https://placeholder.com/150"
            if (file) {
                imageUrl = await handleUploadImage(file)
            }

            const payload = {
                title,
                target_url: targetUrl,
                sort_order: parseInt(sortOrder) || 0,
                is_active: isActive,
                image_url: imageUrl,
            }

            await sdk.client.fetch(`/admin/banners`, {
                method: "POST",
                body: payload
            })

            toast.success("Banner created!")
            setIsCreateOpen(false)
            resetForm()
            fetchBanners()
        } catch (err) {
            toast.error("Failed to create banner")
        }
        setIsSaving(false)
    }

    const handleEdit = async () => {
        setIsSaving(true)
        try {
            let imageUrl = editingBanner.image_url
            if (file) {
                imageUrl = await handleUploadImage(file)
            }

            const payload = {
                title,
                target_url: targetUrl,
                sort_order: parseInt(sortOrder) || 0,
                is_active: isActive,
                image_url: imageUrl,
            }

            await sdk.client.fetch(`/admin/banners/${editingBanner.id}`, {
                method: "POST",
                body: payload
            })

            toast.success("Banner updated!")
            setIsEditOpen(false)
            resetForm()
            fetchBanners()
        } catch (err) {
            toast.error("Failed to update banner")
        }
        setIsSaving(false)
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return
        try {
            await sdk.client.fetch(`/admin/banners/${id}`, { method: "DELETE" })
            toast.success("Banner deleted!")
            fetchBanners()
        } catch (err) {
            toast.error("Failed to delete banner")
        }
    }

    const openEdit = (banner: any) => {
        setEditingBanner(banner)
        setTitle(banner.title)
        setTargetUrl(banner.target_url)
        setSortOrder(banner.sort_order?.toString() || "0")
        setIsActive(banner.is_active)
        setFile(null)
        setIsEditOpen(true)
    }

    return (
        <Container className="flex flex-col gap-y-4">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col gap-y-1">
                    <Heading>Banners</Heading>
                    <Text className="text-ui-fg-subtle">
                        Manage storefront banners
                    </Text>
                </div>
                <Button onClick={() => { resetForm(); setIsCreateOpen(true) }}>
                    <Plus /> Add Banner
                </Button>
            </div>

            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Image</Table.HeaderCell>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Link</Table.HeaderCell>
                        <Table.HeaderCell>Order</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {banners.map((banner) => (
                        <Table.Row key={banner.id}>
                            <Table.Cell>
                                <img src={banner.image_url} alt={banner.title} className="w-16 h-16 object-cover rounded-md" />
                            </Table.Cell>
                            <Table.Cell>{banner.title}</Table.Cell>
                            <Table.Cell>{banner.target_url}</Table.Cell>
                            <Table.Cell>{banner.sort_order}</Table.Cell>
                            <Table.Cell>
                                <Badge color={banner.is_active ? "green" : "grey"}>
                                    {banner.is_active ? "Active" : "Inactive"}
                                </Badge>
                            </Table.Cell>
                            <Table.Cell className="flex gap-x-2 items-center h-full">
                                <Button variant="secondary" size="small" onClick={() => openEdit(banner)}>
                                    <Pencil />
                                </Button>
                                <Button variant="danger" size="small" onClick={() => handleDelete(banner.id)}>
                                    <Trash />
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                    {!isLoading && banners.length === 0 && (
                        <Table.Row>
                            <td colSpan={6} className="text-center text-ui-fg-subtle py-8">
                                No banners found.
                            </td>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>

            {/* CREATE DRAWER */}
            <Drawer open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <Drawer.Content className="flex flex-col z-50 overflow-y-auto w-[500px]">
                    <Drawer.Header>
                        <Drawer.Title>Create New Banner</Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body className="flex flex-col gap-y-4 p-4">
                        <div className="flex flex-col gap-y-2">
                            <Label>Title</Label>
                            <Input placeholder="Spring Sale" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <Label>Target URL (e.g. /store)</Label>
                            <Input placeholder="/store" value={targetUrl} onChange={(e) => setTargetUrl(e.target.value)} />
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <Label>Sort Order</Label>
                            <Input type="number" placeholder="0" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
                        </div>

                        <div className="flex flex-row items-center gap-x-2">
                            <Switch checked={isActive} onCheckedChange={setIsActive} />
                            <Label>Is Active?</Label>
                        </div>

                        <div className="flex flex-col gap-y-2 mt-4">
                            <Label>Banner Image</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files.length > 0) {
                                        setFile(e.target.files[0])
                                    }
                                }}
                            />
                        </div>
                    </Drawer.Body>
                    <Drawer.Footer>
                        <Button variant="secondary" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                        <Button onClick={handleCreate} isLoading={isSaving}>Save Banner</Button>
                    </Drawer.Footer>
                </Drawer.Content>
            </Drawer>

            {/* EDIT DRAWER */}
            <Drawer open={isEditOpen} onOpenChange={setIsEditOpen}>
                <Drawer.Content className="flex flex-col z-50 overflow-y-auto w-[500px]">
                    <Drawer.Header>
                        <Drawer.Title>Edit Banner</Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body className="flex flex-col gap-y-4 p-4">
                        <div className="flex flex-col gap-y-2">
                            <Label>Title</Label>
                            <Input placeholder="Spring Sale" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <Label>Target URL (e.g. /store)</Label>
                            <Input placeholder="/store" value={targetUrl} onChange={(e) => setTargetUrl(e.target.value)} />
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <Label>Sort Order</Label>
                            <Input type="number" placeholder="0" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
                        </div>

                        <div className="flex flex-row items-center gap-x-2">
                            <Switch checked={isActive} onCheckedChange={setIsActive} />
                            <Label>Is Active?</Label>
                        </div>

                        {editingBanner && editingBanner.image_url && (
                            <div className="flex flex-col gap-y-2 mt-4">
                                <Label>Current Image</Label>
                                <img src={editingBanner.image_url} alt="Current" className="w-full max-h-[150px] object-cover rounded-md" />
                            </div>
                        )}

                        <div className="flex flex-col gap-y-2 mt-4">
                            <Label>Replace Image (Optional)</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files.length > 0) {
                                        setFile(e.target.files[0])
                                    }
                                }}
                            />
                        </div>
                    </Drawer.Body>
                    <Drawer.Footer>
                        <Button variant="secondary" onClick={() => setIsEditOpen(false)}>Cancel</Button>
                        <Button onClick={handleEdit} isLoading={isSaving}>Update Banner</Button>
                    </Drawer.Footer>
                </Drawer.Content>
            </Drawer>

        </Container>
    )
}

export const config = defineRouteConfig({
    label: "Banners",
    icon: Photo,
})

export default BannersRoute
